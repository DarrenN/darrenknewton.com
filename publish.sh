#!/bin/zsh

outputs3=$(aws s3 sync html s3://darrennewton.com)
outputcf=$(aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DIST --paths '/*')

echo $outputs3
echo $outputcf
