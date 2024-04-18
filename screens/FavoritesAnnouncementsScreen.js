import React, { useState, useEffect } from "react";
import { View, Image, Text } from "react-native";

export default function FavoritesAnnouncementsScreen() {
  return (
    <View style={styles.container}>
      {favorites.map((announcement) => (
        <View style={styles.announcementContainer} key={announcement._id}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: announcement.photo }} style={styles.image} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{announcement.prenom}</Text>
            <Text style={styles.location}>{announcement.city}</Text>
            <Text style={styles.description}>{announcement.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
