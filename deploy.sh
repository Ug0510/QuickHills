#!/bin/bash
git pull origin main

#deleting the storage link and recreating it with every push
rm -rf ~/domains/quickhills.com/public_html/admin/public/storage
cd ~/domains/quickhills.com/public_html/admin && php artisan storage:link

#clearing the cache
php artisan optimize:clear


