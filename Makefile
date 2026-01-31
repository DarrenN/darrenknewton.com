.PHONY: dry sync

dry:
	aws s3 sync html $(S3_URL_BLOG) --dryrun
sync:
	aws s3 sync html $(S3_URL_BLOG)

