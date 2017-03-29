#!/bin/bash

for COLLECTION in artefacts categories locations materials megalithics periods users
do
    mongoimport --host localhost --db cuttingedge --collection ${COLLECTION} < ${COLLECTION}.json
done
