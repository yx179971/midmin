host=139.129.18.122
#host="139.224.52.109"

#chdir ..
#rsync -avzP .env docker-compose.yml root@$host:/www/test/
chdir backend
rsync -avzP .env package.json dist bootstrap.js node_modules start.sh ecosystem.config.js prisma prisma.config.ts root@$host:/www/test/backend/
chdir ../frontend
rsync -avzP dist/* root@$host:/www/test/backend/public/
