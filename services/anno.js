import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config(); 

function configureAWS() {
    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_S3_REGION
    });
}


export async function detectLabelsff(photo) {
    configureAWS(); 
    const client = new AWS.Rekognition();
    const params = {
        Image: {
            S3Object: {
                Bucket: process.env.AWS_S3_BUCKET_NAME, 
                Name: photo, 
            },
        },
        MaxLabels: 20,
        MinConfidence: 70, 
    };

    try {
        console.log(client.detectLabels,"Datata")
        const data = await client.detectLabels(params).promise();
        // console.log(data.Labels,"datatat")
        data.Labels.forEach(label => {
            console.log(`Label:      ${label.Name}`)
            console.log(`Confidence: ${label.Confidence}`)
            console.log("Instances:")
            label.Instances.forEach(instance => {
              let box = instance.BoundingBox
              console.log("  Bounding box:")
              console.log(`    Top:        ${box.Top}`)
              console.log(`    Left:       ${box.Left}`)
              console.log(`    Width:      ${box.Width}`)
              console.log(`    Height:     ${box.Height}`)
              console.log(`  Confidence: ${instance.Confidence}`)
            })
            console.log("Parents:")
            label.Parents.forEach(parent => {
              console.log(`  ${parent.Name}`)
            })
            console.log("------------")
            console.log("")
          }) // for response.labels
        
        return data
        // return data.Labels.map(extractLabelInfo);
    } catch (error) {
        throw new Error('Error detecting labels');
    }
}


function extractLabelInfo(label) {
    return {
        name: label.Name,
        confidence: label.Confidence,
        instances: label.Instances,
        parents: label.Parents
    };
}

