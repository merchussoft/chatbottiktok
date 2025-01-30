# se usa la imagen oficial de nodejs cokmo base 
FROM node:20-alpine as reactbuild

#establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

RUN yarn --version

# Copia el archivo de dependencias
COPY package.json ./

# Instala las dependencias de la aplicación usando Yarn
RUN yarn install

# Copia el resto de los archivos de la aplicación
COPY . /usr/src/app

# Compila la aplicación de React
RUN yarn build


# Usa una imagen de servidor Nginx para servir la aplicación
FROM nginx:alpine
COPY --from=reactbuild /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80 para el contenedor
EXPOSE 80
EXPOSE 3050
# Inicia Nginx cuando el contenedor se ejecute
CMD ["nginx", "-g", "daemon off;"]