### Mise en prod 

1. Lancer la ligne de commande 
   
   1. ```bash
   npm run build
      ```
   
2. Après quelques recherches sur le net, je suis tombé sur la [documentation](https://router.vuejs.org/fr/guide/essentials/history-mode.html) de vue.js qui disent qu'il faut ajouter des paramètres sur notre serveur.

   ![err](/Users/jeremy/github/windmill/documentation/images/prod/error_server.png)

   2. Cette erreur survenait lorsqu'on écrivait dans l'url `/login`, `/home` et `/dashboard`. Pour palier à cette erreur, j'ai dû faire les étapes suivantes 

   2. Se rendre dans la repo qui est servi par le serveur et créer un fichier `.htaccess`

      ```bash
      touch .htaccess
      nano .htaccess
      ```

   4. Copier et coller les lignes ci-dessous dans le fichier

      ```bash
      <IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
        RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI} [R,L]
      </IfModule>
   ```
      
1. Ces lignes permettront de faire une redirection lorsque nous tapons dans l'URL la page voulue. Mais aussi de faire la redirection vers le protocole `HTTPS` plutôt que `HTTP`
      
   5. Copier ensuite les fichiers générés par Vue.js sur le serveur 
   
      ```bash
      scp -r dist/* [username]@[serveur]:[chemin/au/dossier/servi]
      ```
