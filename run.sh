echo "##################"
echo "# Delete old H5P #"
echo "##################"
rm picture_slider.h5p
zip -r picture_slider.h5p *
echo "################################"
echo "# New Picture Slider is ready! #"
echo "################################"
echo "################################"
echo ""
echo "################################"
echo "# Delete temp files from H5P   #"
echo "################################"
echo "# Delete symlinks from H5P lib #"
echo "# Create new symlic to project #"
echo "################################"

cd /var/www/drupal6/
#sudo drush cc all

sudo drush up
sudo rm -rf sites/default/files/h5p/
sudo pm-disable h5peditor
sudo drush pm-uninstall h5peditor
sudo drush pm-disable h5p
sudo drush pm-uninstall h5p
sudo drush pm-enable h5p
sudo drush pm-enable h5peditor


#sudo drush dl h5p
#drush en h5p h5peditor
#sudo drush dre h5peditor h5p
#sudo drush cc all

cd ~/dev/picture_slider/ 
