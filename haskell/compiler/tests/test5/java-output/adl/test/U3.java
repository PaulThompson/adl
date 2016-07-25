package adl.test;

import org.adl.runtime.Factories;
import org.adl.runtime.Factory;

public class U3 {

  /* Members */

  private Disc disc;
  private Object value;

  public enum Disc {
    V
  }

  /* Constructors */

  public static U3 v(short v) {
    return new U3(Disc.V,v);
  }

  public U3() {
    this.disc = Disc.V;
    this.value = (short)100;
  }

  public U3(U3 other) {
    this.disc = other.disc;
    switch (other.disc) {
      case V:
        this.value = (Short) other.value;
        break;
    }
  }

  private U3(Disc disc, Object value) {
    this.disc = disc;
    this.value = value;
  }

  /* Accessors */

  public Disc getDisc() {
    return disc;
  }

  public short getV() {
    if (disc == Disc.V) {
      return cast(value);
    }
    throw new IllegalStateException();
  }

  /* Mutators */

  public void setV(short v) {
    this.value = v;
    this.disc = Disc.V;
  }

  /* Object level helpers */

  @Override
  public boolean equals(Object other0) {
    if (!(other0 instanceof U3)) {
      return false;
    }
    U3 other = (U3)other0;
    return disc == other.disc && value.equals(other.value);
  }

  @Override
  public int hashCode() {
    return disc.hashCode() * 37 + value.hashCode();
  }

  @SuppressWarnings("unchecked")
  private static <T> T cast(final Object o) {
    return (T)o;
  }

  /* Factory for construction of generic values */

  public static Factory<U3> factory = new Factory<U3>() {
    public U3 create() {
      return new U3();
    }
    public U3 create(U3 other) {
      return new U3(other);
    }
  };
}