echo "##################"
echo "# Delete old H5P #"
echo "##################"
cd ~/dev/picture_slider/
rm picture_slider.h5p
cp -R carouFredSel carouFredSel_backup
mv carouFredSel_backup carouFredSel/.
rm -R carouFredSel/he* carouFredSel/index.html carouFredSel/jquery*
cp carouFredSel/carouFredSel_backup/jquery.carouFredSel-6.2.1.js carouFredSel/.
chown -R griffen:griffen carouFredSel
zip -x *.sh .git TODO carouFredSel/carouFredSel_backup\* -r picture_slider.h5p *
mv carouFredSel/carouFredSel_backup .
rm -R carouFredSel/
mv carouFredSel_backup carouFredSel
echo "################################"
echo "# New Picture Slider is ready! #"
echo "################################"
