echo "##################"
echo "# Delete old H5P #"
echo "##################"
cd ~/dev/picture_slider/
rm picture_slider.h5p
zip -x *.sh .git TODO -r picture_slider.h5p * 
echo "################################"
echo "# New Picture Slider is ready! #"
echo "################################"
