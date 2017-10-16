#!/bin/bash
###############################################################################################
#This script will configure an iRedmail server on a Ubuntu machine. The mail server will be
#used for the Gh0st attack, where they attacker will send a phishing e-mail to the victim
###############################################################################################

#update system and install necessary repo
#sudo apt-get update
#sudo apt-get upgrade
sudo apt-get install bzip2

#Set Domain name
sudo hostnamectl set-hostname mail.gh0st.com

#download iRedMail and store it in root
wget -P /root/ https://bitbucket.org/zhb/iredmail/downloads/iRedMail-0.9.7.tar.bz2

#change the current directory to to root
cd /root

#decompress file
tar xvf iRedMail-0.9.7.tar.bz2

#navigate to folder
cd iRedMail-0.9.7/

#change file permissions
chmod +x iRedMail.sh

#Run iRedMail wizard
sudo bash iRedMail.sh
