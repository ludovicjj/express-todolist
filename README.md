# Express-todo

Creation d'une API REST basique pour administer une to-do list.

## Project

* Express
* Sequelize
* BDD: MariaDB

## Authentication JWT

#### private and public key

Création des clés privée et public avec passphrase 
```
mkdir -p config/jwt

# generate private key with passphrase
openssl genrsa -out config/jwt/private.pem -aes256 4096

# generate public key with passphrase
openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem
```

#### Passphrase:

Renommer le fichier ```config/jwt/secret-example.js``` en ```config/jwt/secret.js``` et mettez à jour la passphrase que vous avez choisi lors de la génération des clés privée/public
```
module.exports = "your_passphrase"
```





## Run project

Express démarre sur le port ``8080`` (modifiable dans ``app.js``)
```
npm start
```