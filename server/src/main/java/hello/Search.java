package hello;

import java.util.HashMap;

public class Search {

    // private final long id;
    private final HashMap<String, HashMap<String, Double>> data;
    public Search(HashMap<String, HashMap<String, Double>> data) {
        // this.id = id;
        this.data = data;
    }

    // public long getId() {
    //     return id;
    // }

    public HashMap<String, HashMap<String, Double>> getData() {
        return data;
    }
}
