#!/bin/bash

export PATH="$PATH:/usr/local/bin"
dt=`date '+%Y_%m_%d_%H_%M_%S'`
/usr/local/bin/rethinkdb-dump -c rethinkdb:28015 -f /backups/"core_$dt.dump"
exit;
