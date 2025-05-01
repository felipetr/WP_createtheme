const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs-extra');
const { execSync } = require('child_process');

module.exports = async function install(textDomain) {
  try {
    const cwd = process.cwd();
    const targetDir = path.join(cwd, textDomain);
    const templateDir = path.join(__dirname, '../template');

    // Copiar estrutura base
    console.log('📁 Copying files...');
    await fs.copy(templateDir, targetDir);
    console.log(`📁 Files copied to: ${targetDir}`);

    process.chdir(targetDir);

    // Solicitar dados do usuário
    const answers = await inquirer.prompt([
      { name: 'theme_name', message: 'Theme name:' },
      { name: 'theme_uri', message: 'Theme URI:' },
      { name: 'description', message: 'Description:' },
      { name: 'author', message: 'Author:' },
      { name: 'author_uri', message: 'Author URI:' }
    ]);

    // Agora 'answers' conterá as respostas do usuário
    const { theme_name, theme_uri, description, author, author_uri } = answers;

    // Rodar npm init
    console.log('🚀 Starting npm init...');
    execSync('npm init -y', { stdio: 'inherit' });

    // Garantir que a versão seja 0.0.1 no package.json
    const pkg = JSON.parse(await fs.readFile('package.json', 'utf-8'));
    pkg.version = '0.0.1';
    pkg.author = author;
    pkg.description = description;
    await fs.writeFile('package.json', JSON.stringify(pkg, null, 2));

    console.log('📦 Installing dependencies...');
    execSync('npm install --save-dev autoprefixer@^10.4.20 cbeautifier@^0.7.1 child_process@^1.0.2 fs@^0.0.1-security gulp@^5.0.0 gulp-bump@^3.2.0 gulp-clean-css@^4.3.0 gulp-concat@^2.6.1 gulp-git@^2.11.0 gulp-jsonminify@^1.1.0 gulp-postcss@^10.0.0 gulp-rename@^2.0.0 gulp-sass@^6.0.0 gulp-uglify@^3.0.2 postcss@^8.5.3 sass@^1.85.1 gulp-zip@^6.1.0', { stdio: 'inherit' });

    const stylePath = path.join(targetDir, 'dist', 'style.css');

    // Garantir que o arquivo de estilo existe antes de tentar ler
    if (!await fs.pathExists(stylePath)) {
      throw new Error(`The style file at ${stylePath} does not exist.`);
    }

    let styleContent = await fs.readFile(stylePath, 'utf8');

    // Substituir as variáveis no arquivo de estilo
    styleContent = styleContent.replace('{{theme_name}}', theme_name)
      .replace('{{theme_uri}}', theme_uri)
      .replace('{{author}}', author)
      .replace('{{author_uri}}', author_uri)
      .replace('{{description}}', description)
      .replace('{{text-domain}}', textDomain)
      .replace('{{version}}', '0.0.1');

    // Escrever o arquivo de volta
    await fs.writeFile(stylePath, styleContent);

    console.log('✅ Theme successfully created at:', targetDir);
  } catch (error) {
    console.error('❌ An error occurred during installation:', error.message);
    process.exit(1);
  }
};
