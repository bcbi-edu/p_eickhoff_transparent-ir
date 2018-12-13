package hello;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.TreeMap;

public class Search {

    // private final long id;
    private TreeMap<String, HashMap<String, Double>> data;
    private ArrayList<String> descriptions;
    public Search(TreeMap<String, HashMap<String, Double>> data, ArrayList<String> descriptions) {
        this.data = data;
        this.descriptions = descriptions;
    }

    public TreeMap<String, HashMap<String, Double>> getData() {
        return this.data;
    }

    public ArrayList<String> getDescriptions() {
        return this.descriptions;
    }
}
