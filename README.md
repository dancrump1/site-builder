
# Drive Brand Studio startup guide (specifically for windows PCs)

## Tips/FAQ located at end of instructions


## Requirements
**I recommend following [DDEV's instructions](https://ddev.readthedocs.io/en/latest/users/install/ddev-installation/#wsl2-docker-desktop-install-script) on installing Ubuntu and Docker. Their docs are very detailed while not being too verbose**
1. NodeJS version 14+, I recommend using [NVM](https://github.com/nvm-sh/nvm) if using Windows
2. Ubuntu
3. DDEV

## From nothing locally -> Full-blown website
1. Clone the scaffolding code **OR** use the scaffold to start a templated github repo:

**Cloning**

Create a local directory, name it, CD into it, then clone the scaffolding repo with

    - SSH (preferred):

    ```shell
    git clone git@github.com:drivebrandstudio/Craft4-Scaffolding.git ./
    ```

    - HTTPS:

    ```shell
    git clone https://github.com/drivebrandstudio/Craft4-Scaffolding.git ./
    ```
then 

   ```shell
   git remote set-url origin https://github.com/OWNER/REPOSITORY.git
   ```
   and make sure you're pointing to the correct spot with

      ```shell
   git remote -v
   ```

**Templated github repo** 

Create a github repo using the template and clone that to your pc


2. **Allow DDEV and makefile to configure the project**
   ```shell
   make install
   ```

3. **Update package.json, make this project truly your own :D**

    - [Project name](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#name)
    - author
    - description
    - etc

4. **Start the dev servers**
```shell
make dev
```

1. **Allow DDEV to open the browser, so split your vscode terminal**
   ```shell
   ddev launch
   ```

2. **Navigate to <https://{the-project-name}.ddev.site/admin>**

If you land on a page with server errors or an if(!hasCraftInstalled) then you are on the right track. Now check your .htaccess file and .env (make sure you have your database hooked into ddev correctly)

## FAQ/Tips
### Errors during install
1. Follow the DDEV instructions slowly and carefully. Read each line all the way through, English is not their first language! (but they speak it gooder than I 😝)
2. Uninstall Ubuntu (all programs related to Ubuntu: Ubuntu, 'install REALEASE (Ubuntu)', .... )
### Prettier
1. You will need to restart the vscode window from the Command Palette (ctrl+shift+p) 
```shell 
Developer: reload window
```
After the reload, let vscode finish loading and indexing, then attempt to use Prettier