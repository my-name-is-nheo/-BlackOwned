import { StyleSheet } from "react-native";

export default StyleSheet.create({
  cardContainer: {
    padding: 0,
    borderRadius: 10,
  },
  cardWrapper: {
    flexDirection: "row",
  },
  hours: { marginBottom: 20, marginTop: 20 },
  imageStyle: {
    resizeMode: "cover",
    height: 200,
    width: 120,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  infoContainer: {
    flex: 1,
    height: 200,
    padding: 10,
    backgroundColor: "pink",
    // alignItems: "stretch",
    justifyContent: "space-between",
  },
  imageStyleHours: {
    resizeMode: "cover",
    // height: 200,
    width: 120,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  infoContainerHours: {
    flex: 1,
    // height: 200,
    padding: 10,
    backgroundColor: "pink",
    // alignItems: "stretch",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  address: { marginBottom: -5 },
  ratings: {
    alignSelf: "flex-start",
    paddingVertical: 10,
  },
});
