package com.kavindaandroid.myapplication;

import android.graphics.Color;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.airbnb.lottie.LottieAnimationView;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.material.bottomsheet.BottomSheetDialogFragment;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link BottomFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class BottomFragment extends BottomSheetDialogFragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;
    DatabaseReference reff;
    String gas_status, fire_status, alcohol_status, accident_status;
    TextView gastext,alcoholtext,firetext,doortext;

    View rootView;
    LottieAnimationView lottieAnimationView,lottieAnimationView2,lottieAnimationView3,lottieAnimationView4;

    public BottomFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment BottomFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static BottomFragment newInstance(String param1, String param2) {
        BottomFragment fragment = new BottomFragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        reff = FirebaseDatabase.getInstance().getReference();
        reff.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                alcohol_status = dataSnapshot.child("Sensor/alcohol").getValue().toString();
                fire_status = dataSnapshot.child("Sensor/fire").getValue().toString();
                gas_status = dataSnapshot.child("Sensor/gas").getValue().toString();
                accident_status = dataSnapshot.child("accident_detect").getValue().toString();

//gas status checking
                if (gas_status.equals("1")) {
                    lottieAnimationView.setVisibility(View.VISIBLE);
                    gastext.setText("Gas detected");
                    gastext.setTextColor(getResources().getColor(R.color.red));
                    lottieAnimationView.animate();
                    lottieAnimationView.loop(true);
                } else {
                    lottieAnimationView.setVisibility(View.GONE);
                    gastext.setText("Normal");
                    gastext.setTextColor(getResources().getColor(R.color.gray));
                }
//fire status checking
                if (fire_status.equals("1")) {
                    lottieAnimationView2.setVisibility(View.VISIBLE);
                    firetext.setText("Fire detected");
                    firetext.setTextColor(getResources().getColor(R.color.red));
                    lottieAnimationView2.animate();
                    lottieAnimationView2.loop(true);
                } else {
                    lottieAnimationView2.setVisibility(View.GONE);
                    firetext.setText("Normal");
                    firetext.setTextColor(getResources().getColor(R.color.gray));
                }
//alcohol status checking
                if (alcohol_status.equals("1")) {
                    lottieAnimationView3.setVisibility(View.VISIBLE);
                    alcoholtext.setText("Alcohol detected");
                    alcoholtext.setTextColor(getResources().getColor(R.color.red));
                    lottieAnimationView3.animate();
                    lottieAnimationView3.loop(true);
                } else {
                    lottieAnimationView3.setVisibility(View.GONE);
                    alcoholtext.setText("Normal");
                    alcoholtext.setTextColor(getResources().getColor(R.color.gray));
                }
//door lock status checking
                if (accident_status.equals("1")) {
                    lottieAnimationView4.setVisibility(View.VISIBLE);
                    doortext.setText("Door unlock");
                    doortext.setTextColor(getResources().getColor(R.color.red));
                    lottieAnimationView4.animate();
                    lottieAnimationView4.loop(true);
                } else {
                    lottieAnimationView4.setVisibility(View.GONE);
                    doortext.setText("Door lock");
                    doortext.setTextColor(getResources().getColor(R.color.gray));
                }

            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });


    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        rootView = inflater.inflate(R.layout.fragment_bottom, container, false);

        gastext = (TextView) rootView.findViewById(R.id.gas_text);
        firetext = (TextView) rootView.findViewById(R.id.fire_text);
        alcoholtext = (TextView) rootView.findViewById(R.id.alcohol_text);
        doortext = (TextView) rootView.findViewById(R.id.lock_text);

        lottieAnimationView = (LottieAnimationView) rootView.findViewById(R.id.lottie1);
        lottieAnimationView2 = (LottieAnimationView) rootView.findViewById(R.id.lottie2);
        lottieAnimationView3 = (LottieAnimationView) rootView.findViewById(R.id.lottie3);
        lottieAnimationView4 = (LottieAnimationView) rootView.findViewById(R.id.lottie4);



        return rootView;
    }
}