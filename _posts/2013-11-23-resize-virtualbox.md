---
layout: post
published: false
---
cd ~/VirtualBox VMs/Lubuntu

/Applications/VirtualBox.app/Contents/MacOS/VBoxManage modifyhd Lubuntu.vdi --resize 4096

0%...10%...20%...30%...40%...50%...60%...70%...80%...90%...100%

sudo fdisk

sudo cfdisk
ensure Bootable

sudo reboot

sudo resize2fs /dev/sda1

http://www.webdesignblog.asia/software/linux-software/resize-virtualbox-disk-image-manipulate-vdi/#sthash.sIlCUpPA.Iyvftjkx.dpbs
http://askubuntu.com/questions/24027/how-to-resize-a-ext4-root-partition-at-runtime
