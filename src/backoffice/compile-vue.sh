vue build 
rm ../../public/ -fr
mkdir -p ../../public/backoffice
mv ./dist/index.html ../../public/backoffice 
mv ./dist/* ../../public 
rm ./dist -fr
