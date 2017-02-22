migrate from google DS to mongo

first:
enable billing on google to avoid hitting datastore quotas and to create a storage bucket

enable storage bucket, say my_bucket

in the bucket list, select permissions
and add a _User_ named olas-info@appspot.gserviceaccount.com with _write_ access

https://ah-builtin-python-bundle-dot-olas-info.appspot.com/_ah/datastore_admin/

bucket name is /gs/my_bucket
notice the /gs/, it's important


http://gbayer.com/big-data/app-engine-datastore-how-to-efficiently-export-your-data/
