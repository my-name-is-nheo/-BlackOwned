import { StyleSheet } from "react-native";

export default StyleSheet.create({
  cardContainer: {
    padding: 0,
    borderRadius: 10,
  },
  cardWrapper: {
    flexDirection: "row",
  },
  imageStyle: {
    resizeMode: "cover",
    height: 150,
    width: 120,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  infoContainer: {
    flex: 1,
    height: 150,
    padding: 10,
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  address: {},
  ratings: {
    alignSelf: "flex-start",
    paddingVertical: 10,
  },
});
