#!/bin/bash

# Folder to process (defaults to current folder if none supplied)
DIR="${1:-.}"

find "$DIR" -type f | while read -r file; do
    echo "Processing: $file"

    perl -pi -e '
        s/£2/£2/g;
        s/£4/£4/g;
        s/£6/£6/g;
        s/£8/£8/g;
        s/£10/£10/g;
        s/£12/£12/g;
    ' "$file"
done

echo "Done."