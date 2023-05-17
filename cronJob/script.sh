#!/bin/sh
for i in 1 2 3 4 5 6
do
   echo "$(date) - $(curl -X PUT https://slugloop.azurewebsites.net/updateMetroBuses)" >> /var/log/cron
   sleep 10
done
