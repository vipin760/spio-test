import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
import moment from "moment";

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: "10px",
    border: "2px solid black",
    margin: "15px",
    borderWidth: "1px",
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Times-Bold",
    marginTop: 30,
  },
  section: {
    color: "#666",
    lineHeight: "1.6",
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    width: 120,
    fontFamily: "Helvetica-Bold",
    color: "black",
  },
  value: {
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  comment: {
    marginTop: "20px",
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  mediaImage: {
    width: 120,
    height: 120,
    marginRight: 5,
    marginBottom: 5,
  },
  copyright: {
    fontSize: 10,
    textAlign: "center",
    color: "gray",
    position: "absolute",
    bottom: 30,
    left: 200,
  },
  border: {
    border: "1px solid black",
    marginTop: 10,
    padding: 10,
  },
  gaps: {
    lineHeight: "1.6",
  },
  getTime: {
    color: "#666",
    lineHeight: "1.6",
    fontSize: "12px",
  },
  replyComment: {
    fontSize: 12,
    width: 120,
    fontFamily: "Helvetica-Bold",
    color: "black",
    marginTop: "10px",
    lineHeight: "1.6",
  },
  googleImageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  googleImage: {
    width: 70,
    height: 70,
  },
});

const ReviewPDF = ({ review }) => (

    
  <Document>
     <Page style={{flex:1}}>
     <View style={{ padding: "10px", border: "1px solid black", margin: '20px', flex:1}}>
      <View style={styles.title}>
        <Text>Customer Review Overview</Text>
      </View>
      <View style={{display:"flex", flexDirection:"row"}}>
      <View style={styles.section}>
        {[
          { label: "Review ID: ", value: String(review.review_id) },
          {
            label: "Customer Name: ",
            value: review.reviewer_display_name ?? "Guest User",
          },
          {
            label: "Rating: ",
            value:
              review.source === "SPIO"
                ? review.spio_rating_type == 1
                  ? `${review.rating_in_number}/5`
                  : `${review.rating_in_number}/10`
                : `${review.rating_in_number}/5`,
          },
          {
            label: "Review Date: ",
            value: moment(review.create_time).format("MMMM Do YYYY"),
          },
        ].map((detail, index) => (
          <View style={styles.detailRow} key={index}>
            <Text style={styles.label}>{detail.label}</Text>
            <Text style={styles.value}>{detail.value}</Text>
          </View>
        ))}
      </View>
      <View style={{marginLeft:"170px"}}>
       {review?.source === "GOOGLE" &&
       <View style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
      <Image src={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png"}} style={styles.googleImage}/>
      <Text style={{fontSize:"14px"}}>Google</Text>
      </View>
       }
      </View>
      </View>
      <View style={styles.comment}>
        <Text style={styles.gaps}>
          {review.reviewer_display_name || "Guest User"}
        </Text>
        <Text style={styles.section}>
          {review.comment || "No Comments received from user."}
        </Text>
      </View>
      {review.media && review.media.length > 0 && (
        <View style={styles.section}>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {review.media.map((media, index) => (
              <Image
                key={index}
                src={
                  media.media_format === "PHOTO"
                    ? media.source_url
                    : media.thumbnail_url
                }
                style={styles.mediaImage}
              />
            ))}
          </View>
        </View>
      )}
      <Text style={styles.getTime}>
        {moment(review.create_time).format("MMMM Do YYYY, h:mm:ss a")}
      </Text>
      {review.reply_comment && review.reply_comment.length > 0 && (
        <View style={styles.replyComment}>
          {review.reply_comment.map((reply, index) => (
            <View key={index} style={{ flexDirection: 'row', flexWrap: "wrap"}}>
              <Text style={styles.label}>{reply.profileName || "User"}</Text>
              <Text style={styles.section}>{reply.comment}</Text>
              <View style={{flexDirection: 'row',alignItems: 'center'}}>
              <Text style={{...styles.getTime}}>
                {moment(reply.updateTime).format("MMMM Do YYYY, ")}
              </Text>
              <Text style={{...styles.getTime, paddingLeft: 25}}>
                {moment(reply.updateTime).format("h:mm:ss a")}
              </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    
      
      <Text style={styles.copyright}>
        Copyright © 2024 Spio. All rights reserved.
      </Text>
    </View>
    </Page>
  </Document>
);

const ExportToPDFButton = ({ reviewId, reviews }) => {
  const review = reviews.find((review) => review.review_id === reviewId);
  if (!review) {
    console.error("Review not found");
    return null;
  }

  return (
    <PDFDownloadLink
      document={<ReviewPDF review={review} />}
      fileName={`Review_${reviewId}.pdf`}
    >
         <button
                  style={{
                    padding: "10px",
                    border: "1px solid",
                    borderRadius: "7px",
                    color: "#161614",
                    height: "38px",
                    width: "100",
                    alignItems:"center",
                    display:"flex"
                  }}
                > 
      <img className="" src="assets/images/logo/download.svg" /></button>
    </PDFDownloadLink>
  );
};

export default ExportToPDFButton;
