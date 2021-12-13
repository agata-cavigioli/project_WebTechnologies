vue build  
rm ../../public/backoffice -fr
mkdir -p ../../public/backoffice
mv ./dist/index.html ../../public/backoffice
mv ./dist/* ../../public
rm ./dist -fr
