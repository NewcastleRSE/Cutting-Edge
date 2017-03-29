#!/bin/bash

for COLLECTION in artefacts categories locations materials megalithics periods users
do
    mongoexport --host localhost -d edge -c ${COLLECTION} -o ${COLLECTION}.json
done
