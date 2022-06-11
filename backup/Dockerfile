FROM ubuntu:16.04
MAINTAINER NİBGAT® "contact@nibgat.com"

RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install cron nano python3 python3-pip -y
RUN pip3 install rethinkdb

COPY ./backup.sh /data/
ADD ./core /core
RUN touch /var/log/cron.log

RUN chmod -R 777 /data/backup.sh
RUN chmod -R 777 /core
RUN chmod +x /data/backup.sh

RUN echo "* * * * * root sh /data/backup.sh schedule:run >> /var/log/cron.log 2>&1" >> /etc/crontab

CMD service cron start && tail -f /var/log/cron.log
