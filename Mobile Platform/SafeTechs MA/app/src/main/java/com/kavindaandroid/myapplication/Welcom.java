package com.kavindaandroid.myapplication;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;

import com.airbnb.lottie.LottieAnimationView;

public class Welcom extends AppCompatActivity {
    LottieAnimationView lottieAnimationView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_welcom);

        lottieAnimationView=findViewById(R.id.lottie_welcom);
        lottieAnimationView.animate().translationY(1600).setDuration(1000).setStartDelay(4000);
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                Intent myIntent = new Intent(Welcom.this, MapsActivity.class);
                startActivity(myIntent);
            }
        },1000);
    }
}