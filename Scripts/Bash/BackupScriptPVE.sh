#!/bin/bash

# === SETTINGS ===
# Replace with your local user
WORKSTATION_USER="$SUDO_USER"
# Replace with your local IP
WORKSTATION_IP="<IPADDRESS>"
WORKSTATION_DIR="proxmox-backups"

echo ">> Creating local backup folder on Proxmox..."
mkdir -p /root/backups

echo ">> Backing up ALL LXC containers..."
for vmid in $(pct list | awk 'NR>1 {print $1}'); do
  echo ">>> Backing up LXC $vmid..."
  vzdump $vmid --mode stop --compress gzip --dumpdir /root/backups
done

echo ">> Saving container configs..."
tar czvf /root/pve-lxc-configs.tar.gz /etc/pve/lxc/

echo ">> Creating backup folder on your MacBook..."
ssh $WORKSTATION_USER@$WORKSTATION_IP "mkdir -p ~/$WORKSTATION_DIR"

echo ">> Copying backups TO your MacBook (this may take a while)..."
scp /root/backups/*.gz $WORKSTATION_USER@$WORKSTATION_IP:~/$WORKSTATION_DIR/
scp /root/pve-lxc-configs.tar.gz $WORKSTATION_USER@$WORKSTATION_IP:~/$WORKSTATION_DIR/

echo ""
echo "==============================="
echo "   BACKUP COMPLETE"
echo "==============================="
echo "Files stored on your MacBook at:"
echo "  ~/$WORKSTATION_DIR"
echo ""
echo "Contents:"
ssh $WORKSTATION_USER@$WORKSTATION_IP "ls -lh ~/$WORKSTATION_DIR"
echo ""
echo "You're safe to reinstall Proxmox now."