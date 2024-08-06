#!/bin/sh

if [ "$1" != "" ]; then
    if [ "$2" != "" ]; then
        wget --limit-rate=100K --keep-session-cookies --load-cookies=cookies.txt https://www.space-track.org/basicspacedata/query/class/boxscore
        wget  --post-data="identity=$1&password=$2&query=https://www.space-track.org/basicspacedata/query/class/tle_latest/ORDINAL/1/EPOCH/%3Enow-30/orderby/NORAD_CAT_ID/format/json" --cookies=on --keep-session-cookies --save-cookies=cookies.txt 'https://www.space-track.org/ajaxauth/login' -O data/data_downloading.json
        mv data/data_downloading.json data/data.json
    else
        echo "password = $1"
        echo "password missing"
    fi
else
    echo "username = $2"
    echo "username missing"
fi
