#!/bin/bash

# Wait for MySQL container to be ready
sleep 15

# Run migrations and seeding
composer install
php artisan migrate --seed
php artisan serve --host=0.0.0.0 --port=8000