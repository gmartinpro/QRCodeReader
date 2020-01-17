import 'package:flutter/material.dart';

class CustomBottomNavigationBar extends StatelessWidget {
  CustomBottomNavigationBar({ @required this.currentIndex, @required this.onTap });
  
  final int currentIndex;
  final Function onTap;

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        currentIndex: currentIndex,
        items: [
          BottomNavigationBarItem(
              icon: Icon(Icons.home),
              title: Text("Accueil"),
              backgroundColor: Colors.blue),
          BottomNavigationBarItem(
              icon: Icon(Icons.camera_alt),
              title: Text("Scan"),
              backgroundColor: Colors.blue),
          BottomNavigationBarItem(
              icon: Icon(Icons.list),
              title: Text("Mes reductions"),
              backgroundColor: Colors.blue),
        ],
        onTap: (index) {
          onTap(index);
        },
      );
  }
}