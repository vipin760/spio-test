import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import moment from "moment";

// URL of the Google logo
const GOOGLE_LOGO_URL = "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg";

export const exportToPDF = async (reviewId, reviews) => {
  console.log(reviews, "reviews");
  const review = reviews.find((review) => review.review_id === reviewId);
  if (!review) {
    console.error("Review not found");
    return;
  }

  const doc = new jsPDF();

  // Document setup
  doc.setFont("Roboto", "normal");
  doc.setTextColor(0, 0, 0);

  // Draw border with padding on every page
  const padding = 10;
  const paddingforborder = 10;

  // Title "Customer Review Overview"
  doc.setFontSize(16);
  doc.setFont("times", "bold");
  doc.text(
    "Customer Review Overview",
    doc.internal.pageSize.width / 2,
    padding + 10,
    { align: "center" }
  );

  // Review Details Section
  doc.setFontSize(12);
  doc.setFont("Roboto", "normal");
  let startY = padding + 25;

  const details = [
    { label: "Review ID: ", value: String(review.review_id) },
    {
      label: "Customer Name: ",
      value:
        review.reviewer_display_name == null
          ? "Guest User"
          : review.reviewer_display_name,
    },
    {
      label: "Rating: ",
      value:
        review.source === "SPIO"
          ? review.spio_rating_type === 1
            ? review.rating_in_number + "/5"
            : review.rating_in_number + "/10"
          : review.rating_in_number + "/5",
    },
    {
      label: "Review Date: ",
      value: moment(review.create_time).format("MMMM Do YYYY"),
    },
  ];

  <img src="assets/images/logo/download.svg" alt=""/>

  details.forEach((detail) => {
    doc.setFont("Roboto", "bold");
    doc.text(detail.label, padding + 10, startY);

    doc.setFont("Roboto", "normal");
    doc.text(String(detail.value), padding + 52, startY);

    startY += 10;
  });

  // Customer Comments
  doc.setFont("Roboto", "bold");
  startY += 5; // Add more space between details and comments
  doc.text(review.reviewer_display_name || "Guest user", padding + 10, startY); // Adjusted startY position
  doc.setFont("Roboto", "normal");
  const commentText = review.comment ? review.comment : "No Comments received from user.";
  const commentLines = doc.splitTextToSize(
    commentText,
    doc.internal.pageSize.width - 2 * padding - 20
  );

  commentLines.forEach((line, index) => {
    doc.text(line, padding + 10, startY + 9 + index * 9);
  });
  startY += 10 + commentLines.length * 10;

  // Media
  let mediaPresent = false; // Flag to track if media is present

  if (review.media && review.media.length > 0) {
    startY += 5;
    doc.setFont("Roboto", "bold");
    doc.text("Media:", padding + 10, startY);
    doc.setFont("Roboto", "normal");
    let y = startY + 5; // Adjust starting y position for media
    let x = padding + 15; // Initial x position for images
    const imageSize = 40; // Adjust image size
    review.media.forEach((media) => {
      if ((media.media_format === "PHOTO" || media.media_format === "VIDEO") && media.source_url) {
        if (x + imageSize > doc.internal.pageSize.width) {
          x = padding + 15; // Reset x position for new line
          y += imageSize + 10; // Adjust y position for new line
          if (y + imageSize > doc.internal.pageSize.height) {
            doc.addPage();
            y = padding + 10;
          }
        }
        doc.addImage(media.media_format === "PHOTO" ? media.source_url : media.thumbnail_url, "JPEG", x, y, imageSize, imageSize);
        x += imageSize + 5; // Adjust x position for next image
      }
    });
    mediaPresent = true; // Set flag to true if media is present
  }

  // Calculate space needed for media
  let spaceNeededForMedia = mediaPresent ? 60 : 0; // Adjust this value as needed

  // Calculate space needed for customer comments
  let spaceNeededForCustomerComments = 10 + commentLines.length * 10;

  // Reply Comments
  if (review.reply_comment && review.reply_comment.length > 0) {
    startY += spaceNeededForMedia; // Add space before reply comments
    review.reply_comment.forEach((reply, index) => {
      doc.setFont("Roboto", "bold"); // Set font to bold
      doc.text(reply.profileName || "User", padding + 10, startY);
      startY += 5;
      doc.setFont("Roboto", "normal"); // Set font back to normal for the rest of the text
      const replyText = `${reply.comment}`;
      const replyLines = doc.splitTextToSize(
        replyText,
        doc.internal.pageSize.width - 2 * padding - 20
      );
      replyLines.forEach((line, idx) => {
        doc.text(line, padding + 10, startY + 2 + idx * 9);
      });
      startY += 5 + replyLines.length * 7;
    });
  }

  // Adjust startY position if no media is present
  if (!mediaPresent) {
    startY -= spaceNeededForMedia;
  }

  // Draw border with padding on every page
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    doc.rect(
      paddingforborder,
      paddingforborder,
      pageWidth - 2 * paddingforborder,
      pageHeight - 2 * paddingforborder
    );
  }

  // Add Google logo if the source is "GOOGLE"
  if (review.source === "GOOGLE") {
    try {
      const logo = await fetch(GOOGLE_LOGO_URL);
      const logoBlob = await logo.blob();
      const reader = new FileReader();
      reader.readAsDataURL(logoBlob);
      reader.onloadend = function() {
        const logoDataUrl = reader.result;
        doc.addImage(logoDataUrl, "PNG", doc.internal.pageSize.width - 50, 10, 40, 15);
      };
    } catch (error) {
      console.error("Failed to load Google logo:", error);
    }
  }

  // Copyright
  startY = doc.internal.pageSize.height - padding - 15;
  doc.setTextColor(100);
  doc.setFontSize(10);
  doc.text("Copyright © 2024 Spio. All rights reserved.", padding + 10, startY);

  // Save PDF
  doc.save(`Review_${reviewId}.pdf`);
};
