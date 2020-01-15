import 'package:flutter/material.dart';

class ScanScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Scan"),
      ),
          body:Container(
        alignment: Alignment.center,
        child: Text("ScanScreen"),
      ), 
    );
  }
}