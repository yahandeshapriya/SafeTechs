package com.kavindaandroid.myapplication;

import static com.kavindaandroid.myapplication.databinding.ActivityMapsBinding.inflate;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import androidx.fragment.app.FragmentActivity;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.widget.Toast;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.kavindaandroid.myapplication.databinding.ActivityMapsBinding;

public class MapsActivity extends FragmentActivity implements OnMapReadyCallback {

    private GoogleMap mMap;
    private ActivityMapsBinding binding;

    String connections, accident_status = "0", alcohol_status, fire_status, gas_status;
    DatabaseReference reff;
    LatLng locations;
    Marker marker, marker2;

    int x = 10;
    String lat, lng;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel("My Notification", "My Notification", NotificationManager.IMPORTANCE_DEFAULT);
            NotificationManager manager = getSystemService(NotificationManager.class);
            manager.createNotificationChannel(channel);
        }
        reff = FirebaseDatabase.getInstance().getReference();
        reff.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {

            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });


        binding = inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);

        Toast.makeText(this, "Map is Ready", Toast.LENGTH_SHORT).show();
    }


    @Override
    public void onMapReady(GoogleMap googleMap) {
        reff = FirebaseDatabase.getInstance().getReference();
        reff.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {


                lat = dataSnapshot.child("location/Latitude").getValue().toString();
                lng = dataSnapshot.child("location/Longitude").getValue().toString();
                System.out.println("......................lat"+lat);

                System.out.println("......................long"+lng);



        mMap = googleMap;

        // Add a marker in Sydney and move the camera
        locations = new LatLng(Double.parseDouble(lat), Double.parseDouble(lng));

//        mMap.addMarker(new MarkerOptions().position(sydney).title(""));
        mMap.moveCamera(CameraUpdateFactory.newLatLng(locations));
        mMap.animateCamera(CameraUpdateFactory.newLatLngZoom(locations, 15), 3000, null);

        mMap.setOnMarkerClickListener(new GoogleMap.OnMarkerClickListener() {
            @Override
            public boolean onMarkerClick(@NonNull Marker marker) {
                if (marker.getTitle().equals("!! Emergency !!")) {
                    System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                    BottomFragment bottomFragment = new BottomFragment();
                    bottomFragment.show(getSupportFragmentManager(), bottomFragment.getTag());
                }
                return false;
            }
        });



                connections = dataSnapshot.child("user").getValue().toString();
                System.out.println(connections);
                System.out.println("..............................accident_detect...................................................");
                accident_status = dataSnapshot.child("accident_detect").getValue().toString();
                System.out.println(accident_status);


                if (Integer.parseInt(accident_status) == 1) {
                    if (x == 0) {
                        marker2.remove();

                    }
                    marker = mMap.addMarker(new MarkerOptions().position(locations).title("!! Emergency !!").snippet("please help me,i need your help...\uD83D\uDE91").icon(BitmapDescriptorFactory.fromResource(R.mipmap.accident)));
                    marker.showInfoWindow();
                    x = 1;
                    Notification_alert();

                } else {
                    if (x == 1) {
                        marker.remove();

                    }

                    marker2 = mMap.addMarker(new MarkerOptions().position(locations).title(connections+" \uD83D\uDE0E").icon(BitmapDescriptorFactory.fromResource(R.mipmap.normalcar)));
                    x = 0;
                }


                alcohol_status = dataSnapshot.child("Sensor/alcohol").getValue().toString();
                if (Integer.parseInt(alcohol_status) == 1) {
                    Notification_alert_alcohol();
                }
                fire_status = dataSnapshot.child("Sensor/fire").getValue().toString();
                if (Integer.parseInt(fire_status) == 1) {
                    Notification_alert_fire();
                }
                gas_status = dataSnapshot.child("Sensor/gas").getValue().toString();
                if (Integer.parseInt(gas_status) == 1) {
                    Notification_alert_gas();
                }

            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });
    }


    void Notification_alert() {
        NotificationCompat.Builder builder = new NotificationCompat.Builder(MapsActivity.this, "My Notification");
        builder.setContentTitle("Safe Techs");
        builder.setContentText("Accident Detection Service has detected a Crash.need your help..");
        builder.setSmallIcon(R.drawable.emergencyservices);
        builder.setAutoCancel(true);

        NotificationManagerCompat managerCompat = NotificationManagerCompat.from(MapsActivity.this);
        if (ActivityCompat.checkSelfPermission(MapsActivity.this, android.Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            return;
        }
        managerCompat.notify(1, builder.build());
    }


    void Notification_alert_gas() {
        NotificationCompat.Builder builder = new NotificationCompat.Builder(MapsActivity.this, "My Notification");
        builder.setContentTitle("Safe Techs warning alert!");
        builder.setContentText("GAS leak detected..");
        builder.setSmallIcon(R.drawable.lpg);
        builder.setAutoCancel(true);

        NotificationManagerCompat managerCompat = NotificationManagerCompat.from(MapsActivity.this);
        if (ActivityCompat.checkSelfPermission(MapsActivity.this, android.Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            return;
        }
        managerCompat.notify(1, builder.build());
    }

    void Notification_alert_fire() {
        NotificationCompat.Builder builder = new NotificationCompat.Builder(MapsActivity.this, "My Notification");
        builder.setContentTitle("Safe Techs warning alert!");
        builder.setContentText("FIRE explosion detected..");
        builder.setSmallIcon(R.drawable.fire);
        builder.setAutoCancel(true);

        NotificationManagerCompat managerCompat = NotificationManagerCompat.from(MapsActivity.this);
        if (ActivityCompat.checkSelfPermission(MapsActivity.this, android.Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            return;
        }
        managerCompat.notify(1, builder.build());
    }


    void Notification_alert_alcohol() {
        NotificationCompat.Builder builder = new NotificationCompat.Builder(MapsActivity.this, "My Notification");
        builder.setContentTitle("Safe Techs warning alert!");
        builder.setContentText("Alcohol detected.fire accidents may occur.");
        builder.setSmallIcon(R.drawable.alcohol);
        builder.setAutoCancel(true);

        NotificationManagerCompat managerCompat = NotificationManagerCompat.from(MapsActivity.this);
        if (ActivityCompat.checkSelfPermission(MapsActivity.this, android.Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
            // TODO: Consider calling
            //    ActivityCompat#requestPermissions
            // here to request the missing permissions, and then overriding
            //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
            //                                          int[] grantResults)
            // to handle the case where the user grants the permission. See the documentation
            // for ActivityCompat#requestPermissions for more details.
            return;
        }
        managerCompat.notify(1, builder.build());
    }
}