### Mise en prod 

1. Lancer la ligne de commande 
   
   1. ```bash
   npm run build
      ```
   
5. Après quelques recherches sur le net, je suis tombé sur la [documentation](https://router.vuejs.org/fr/guide/essentials/history-mode.html) de vue.js qui disent qu'il faut ajouter des paramètres sur notre serveur.

   1. ![err](/Users/jeremy/github/windmill/documentation/images/prod/error_server.png)

   2. Cette erreur survenait lorsqu'on écrivait dans l'url `/login`, `/home` et `/dashboard`. Pour palier à cette erreur, j'ai dû créer sur le serveur un fichier `.htaccess` afin d'y mettre ces lignes suivantes 

   3. ```bash
      <IfModule mod_rewrite.c>
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
      </IfModule>
      ```



### Problème 

Impossible de taper dans la barre de recherche l'URL. On est obligés des passer par les boutons de l'applications. 

- À voir s'il y a pas une config dans le serveur à faire 
  - a2enmod ?