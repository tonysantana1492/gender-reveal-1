export const parentsNames = "Yanisleydis & Richard";
export const phoneNumber = "+1 (786) 515-3049";

export const locationName = "Doral Glades Park, Pavilion 4";
export const address = "7600 NW 98 PL, Doral, Florida 33178, USA";
export const eventStartDate = "20260503T140000";
export const eventEndDate = "20260503T170000";

export const googleMapsUrl = `https://maps.app.goo.gl/anZiSaWqAT9pGUYK9?g_st=aw`;
export const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3590.8098425583494!2d-80.35879229999999!3d25.8428106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9bbda6efc810d%3A0x95cf9cd52b0c9aa8!2sDoral%20Glades%20Park!5e0!3m2!1sen!2sus!4v1777332351393!5m2!1sen!2sus`;

export function createGoogleCalendarUrl({
  title,
  details,
}: {
  title: string;
  details: string;
}) {
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${eventStartDate}/${eventEndDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(address)}`;
}
