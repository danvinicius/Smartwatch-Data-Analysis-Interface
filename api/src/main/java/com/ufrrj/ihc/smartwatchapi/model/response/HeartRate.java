package com.ufrrj.ihc.smartwatchapi.model.response;

import java.util.List;

public class HeartRate {

    List<Data> data;

    public List<Data> getData() {
        return data;
    }

    public void setData(List<Data> data) {
        this.data = data;
    }
}
