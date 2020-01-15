import 'package:flutter/material.dart';
import 'package:mspr/screens/HomeScreen.dart';
import 'package:mspr/screens/ReductionScreen.dart';
import 'package:mspr/screens/ScanScreen.dart';

enum Routes {
  HOME,
  SCAN,
  REDUCTION,
}

// For 
Map<String, WidgetBuilder> routes = {
  Routes.HOME.toString(): (context) => HomeScreen(),
  Routes.SCAN.toString(): (context) => ScanScreen(),
  Routes.REDUCTION.toString(): (context) => ReductionScreen()
};
