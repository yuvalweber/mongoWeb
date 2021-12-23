# check if argument is set
if [ -z "$1" ]
then
	echo -e "\033[91musage: run.sh <scale_number>\033[0m"
	exit
fi
echo -e "\033[93mcreating replicaset and web server... \033[0m"
docker-compose up -d --build --scale mongo=$1 &> /dev/null
sleep 1
initiate_cmd="rs.initiate({_id:\"rs0\",members:["
for i in $(seq $1)
do
	if [ $i -ne $1 ]
	then
		initiate_cmd="${initiate_cmd}{\"_id\":${i},\"host\":\"root_mongo_${i}:27017\"},"
	else
		initiate_cmd="${initiate_cmd}{\"_id\":${i},\"host\":\"root_mongo_${i}:27017\"}]})"
	fi
done

echo -e "\033[93madding all the members to the replica rs0...\033[0m"
docker exec -it root_mongo_1 mongo --eval ${initiate_cmd} > /dev/null

if [ $? -eq 0 ]
then
	echo -e "\033[92mbuilt replicaset and web server sucessfully\033[0m"
else
	echo -e "\033[91mfailed to build replicaset and web server\033[0m"
fi
