# Use a imagem oficial do PHP com Apache
FROM php:8.3-apache

# Instalar dependências do sistema e extensões do PHP
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    sqlite3 \
    libsqlite3-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-install pdo pdo_sqlite

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configurar o diretório de trabalho
WORKDIR /var/www/html

# Copiar os arquivos do projeto
COPY . .

# Instalar as dependências do Composer
RUN composer install

# Expor a porta 80 para o servidor Apache
EXPOSE 80

# Rodar o comando do Artisan para iniciar o servidor
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=80"]
