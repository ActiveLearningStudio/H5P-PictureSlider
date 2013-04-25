sudo sh create_zip.sh
echo "################################"
echo ""
echo "################################"
echo "# Delete temp files from H5P   #"
echo "################################"
cd /var/www/drupal6/
sudo drush cc all
echo "################################"
echo "# Delete symlinks from H5P lib #"
echo "################################"
sudo drush up
sudo rm -rf sites/default/files/h5p/
sudo drush -y pm-disable h5peditor
sudo drush -y pm-uninstall h5peditor
sudo drush -y pm-disable h5p
sudo drush -y pm-uninstall h5p
sudo drush -y pm-enable h5p
sudo drush -y pm-enable h5peditor
#sudo drush dl h5p
#drush en h5p h5peditor
#sudo drush dre h5peditor h5p
#sudo drush cc all
cd ~/dev/picture_slider/
