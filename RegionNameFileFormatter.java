package fyp;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class RegionNameFileFormatter {


public static final String INPUT = "D:\\File\\HKU\\Semester 7\\COMP4801\\SpaceKey-website\\region_name";
public static final String OUTPUT = "D:\\File\\HKU\\Semester 7\\COMP4801\\SpaceKey-website\\region_name-formatted.json";

public static void main(String[] args) {
	try {
		System.out.println("Start reformatting...");
		
	    File fileInput = new File(INPUT);
	    File fileOutput = new File(OUTPUT);
	    
	    BufferedReader reader = new BufferedReader(new FileReader(fileInput));
	    BufferedWriter writer = new BufferedWriter(new FileWriter(fileOutput));

	    
	    writer.write("{global.regionName = [");
	    String line;
	    
	    while ((line = reader.readLine()) != null) {
	    	System.out.println(line);
	    	writer.write("{ key: " + line + ", value: " + line + ", text: " + line + " },\n");
	    }
	    
	    writer.write("]}");
	    
	    reader.close();
	    writer.close();
	    
	    System.out.println("Done reformatting...");
	} catch (IOException e) {
	    e.printStackTrace();
	}
}

}
