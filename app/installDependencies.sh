#!/usr/bin/env bash

YUM_CMD=$(which yum)
APT_GET_CMD=$(which apt-get)
PACMAN_CMD=$(which pacman)
DNF_CMD=$(which dnf)
ZYPPER_CMD=$(which zypper)
EMERGE_CMD=$(which emerge)

echo "Auto installing dependencies started. You'll have to pass your sudo password if needed."

if [[ ! -z ${YUM_CMD} ]]; then
    yum install -y mpv
    yum install -y w3m-img
elif [[ ! -z ${APT_GET_CMD} ]]; then
    sudo apt-get install -y mpv w3m-img
elif [[ ! -z ${PACMAN_CMD} ]]; then
    sudo pacman -S --noconfirm mpv w3m
elif [[ ! -z ${DNF_CMD} ]]; then
    dnf install -y mpv w3m-img
elif [[ ! -z ${ZYPPER_CMD} ]]; then
    zypper install -n mpv w3m
elif [[ ! -z ${EMERGE_CMD} ]]; then
    emerge media-video/mpv
else
    echo "Can't install dependencies."
fi