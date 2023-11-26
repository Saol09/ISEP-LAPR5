echo "Switching to branch master"
git checkout master

echo "Building the project"
npm run build-win

echo "Deploying files to server"
scp -P 10118 -r build/* root@vsgate-ssh.dei.isep.ipp.pt:/var/www/10.9.20.118

echo "Done"