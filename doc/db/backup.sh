#!/bin/bash

for COLLECTION in artefacts categories locations materials megalithics periods users
do
    mongoexport --host dharma.mongohq.com --port 10010 -u edge -p 3dg3 -d edge -c ${COLLECTION} -o ${COLLECTION}.json
done