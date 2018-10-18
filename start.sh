source_path=$(cd lib; pwd)
postfix_path=/lib
wx_link_path=$(cd example/mp/wx/pages;pwd)
alipay_link_path=$(cd example/mp/alipay/pages;pwd)



# echo $source_path
# echo $wx_link_path
# echo $alipay_link_path

ln -s $source_path $wx_link_path
ln -s $source_path $alipay_link_path